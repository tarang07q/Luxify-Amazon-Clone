const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(options) {
    try {
      const mailOptions = {
        from: `${process.env.FROM_NAME || 'Luxify'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  // Welcome email template
  async sendWelcomeEmail(user) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Luxify! 🎉</h1>
          </div>
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            <p>Thank you for joining Luxify, your premium shopping destination. We're excited to have you as part of our community!</p>
            
            <p>Here's what you can do with your new account:</p>
            <ul>
              <li>Browse thousands of premium products</li>
              <li>Create and manage your wishlist</li>
              <li>Track your orders in real-time</li>
              <li>Leave reviews and ratings</li>
              <li>Enjoy exclusive member discounts</li>
            </ul>
            
            <a href="${process.env.CLIENT_URL || 'http://localhost:3004'}" class="button">Start Shopping</a>
            
            <p>If you have any questions, our customer support team is here to help!</p>
            
            <p>Happy shopping!<br>The Luxify Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Luxify. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      email: user.email,
      subject: 'Welcome to Luxify - Your Premium Shopping Journey Begins!',
      html
    });
  }

  // Order confirmation email
  async sendOrderConfirmation(user, order) {
    const orderItemsHtml = order.orderItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 5px; overflow: hidden; }
          .order-table th { background: #f3f4f6; padding: 15px; text-align: left; }
          .total-row { background: #f9f9f9; font-weight: bold; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed! ✅</h1>
            <p>Order #${order.trackingNumber || order._id}</p>
          </div>
          <div class="content">
            <h2>Thank you for your order, ${user.name}!</h2>
            <p>We've received your order and it's being processed. You'll receive another email when your items ship.</p>
            
            <table class="order-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
                <tr class="total-row">
                  <td colspan="3" style="padding: 15px; text-align: right;">Total:</td>
                  <td style="padding: 15px; text-align: right;">$${order.totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <p><strong>Shipping Address:</strong><br>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
            ${order.shippingAddress.country}</p>
            
            <a href="${process.env.CLIENT_URL || 'http://localhost:3004'}/order/${order._id}" class="button">Track Your Order</a>
            
            <p>Estimated delivery: ${order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : '3-5 business days'}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      email: user.email,
      subject: `Order Confirmation - ${order.trackingNumber || order._id}`,
      html
    });
  }

  // Order status update email
  async sendOrderStatusUpdate(user, order, newStatus) {
    const statusMessages = {
      'Processing': 'Your order is being prepared',
      'Packed': 'Your order has been packed and is ready to ship',
      'Shipped': 'Your order is on its way!',
      'Out for Delivery': 'Your order is out for delivery',
      'Delivered': 'Your order has been delivered',
      'Cancelled': 'Your order has been cancelled'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .status-badge { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Update 📦</h1>
            <p>Order #${order.trackingNumber || order._id}</p>
          </div>
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            <p>Your order status has been updated:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${newStatus}</span>
            </div>
            
            <p>${statusMessages[newStatus] || 'Your order status has been updated.'}</p>
            
            ${newStatus === 'Shipped' ? `
              <p><strong>Tracking Information:</strong><br>
              Carrier: ${order.shippingCarrier || 'Amazon Logistics'}<br>
              Tracking Number: ${order.trackingNumber}</p>
            ` : ''}
            
            <a href="${process.env.CLIENT_URL || 'http://localhost:3004'}/order/${order._id}" class="button">View Order Details</a>
            
            <p>Thank you for choosing Luxify!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      email: user.email,
      subject: `Order Update: ${newStatus} - ${order.trackingNumber || order._id}`,
      html
    });
  }

  // Password change notification
  async sendPasswordChangeNotification(user) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .alert { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Changed 🔐</h1>
          </div>
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            <p>Your password has been successfully changed.</p>
            
            <div class="alert">
              <strong>Security Notice:</strong> If you didn't make this change, please contact our support team immediately.
            </div>
            
            <p>For your security, we recommend:</p>
            <ul>
              <li>Using a strong, unique password</li>
              <li>Not sharing your password with anyone</li>
              <li>Logging out of shared devices</li>
            </ul>
            
            <p>If you have any concerns, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      email: user.email,
      subject: 'Password Changed - Luxify Account',
      html
    });
  }
}

module.exports = new EmailService();
