# Mr.OSKAR Particle Template Engine 🚀

Interactive 3D particle simulation engine that transforms geometric shapes and images into interactive particle fields.

## 🛠 Features
- **3D Particle Simulation**: 20,000+ interactive particles.
- **Rich Text Editor**: Advanced description editing with Tiptap (Styles, Colors, Alignment).
- **Custom Image Upload**: Convert your own images into particle formations.
- **Collapsible UI**: Full-screen immersive experience with toggleable panels.

## 🚀 How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   Ensure you have a PostgreSQL database connected via `DATABASE_URL`, then run:
   ```bash
   npm run db:push
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://0.0.0.0:5000`.

## 💻 التشغيل على VS Code (Windows)

لاتباع هذه الخطوات، تأكد من تثبيت [Node.js](https://nodejs.org/) و [PostgreSQL](https://www.postgresql.org/) على جهازك.

1. **تحميل المشروع**:
   - قم بتحميل الكود وفك الضغط عنه، ثم افتح المجلد باستخدام VS Code.

2. **تثبيت المكتبات**:
   - افتح Terminal جديد في VS Code (Ctrl+`) واكتب:
     ```bash
     npm install
     ```

3. **إعداد قاعدة البيانات**:
   - قم بإنشاء قاعدة بيانات جديدة في PostgreSQL.
   - أنشئ ملفاً باسم `.env` في المجلد الرئيسي للمشروع وأضف رابط قاعدة البيانات:
     ```env
     DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME
     ```
     *(استبدل USERNAME و PASSWORD و DATABASE_NAME ببياناتك الخاصة)*

4. **تجهيز الجداول**:
   - في Terminal، قم بتنفيذ الأمر التالي لإنشاء الجداول:
     ```bash
     npm run db:push
     ```

5. **تشغيل المشروع**:
   - ابدأ تشغيل خادم التطوير:
     ```bash
     npm run dev
     ```
   - افتح المتصفح وانتقل إلى الرابط: `http://localhost:5000`

---
**Eng.Abdulrazzaq Al-Surabi**
- **Email**: oskar1python@gmail.com
- **Project**: Mr.OSKAR Template Engine

---
Built with React, Three.js, Express, and Drizzle ORM.