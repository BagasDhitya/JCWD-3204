export const announcementTemplate = (subject: string, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #0f62fe;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #777;
      background-color: #f1f1f1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Pengumuman HR
    </div>
    <div class="content">
      <h2>${subject}</h2>
      <p>${message}</p>
    </div>
    <div class="footer">
      Email ini dikirim oleh sistem otomatis KaryaOne. Harap tidak membalas.
    </div>
  </div>
</body>
</html>
`;
