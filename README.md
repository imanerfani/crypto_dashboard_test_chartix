# داشبورد دارایی

یک داشبورد ارز دیجیتال زیبا و تعاملی با Nuxt 3 که قیمت‌ها، تغییرات ۲۴ ساعته، بیشترین سود و ضرر، و لیست علاقمندی‌ها را نمایش می‌دهد.
پروژه کاملاً واکنش‌گراست و تجربه کاربری روان و جذاب ارائه می‌دهد.

## امکانات:

نمایش ۵ ارز با بیشترین سود و ضرر در داشبورد

نمایش لیست دارایی‌ها با قابلیت paginate (حداکثر ۵ شماره صفحه)

دکمه‌های قبلی / بعدی برای صفحات

کارت‌های ارز با تصویر، نام، قیمت و تغییرات ۲۴ ساعته

Skeleton Loader هنگام بارگذاری داده‌ها

Sidebar برای دسکتاپ و Navigation Footer برای موبایل

صفحه خوش‌آمدگویی برای کاربران جدید

طراحی واکنش‌گرا و زیبا با TailwindCSS

Tech Stack

Nuxt 3

Vue 3

TailwindCSS

API داده‌های ارز دیجیتال

Setup

Clone the repository:
```bash
git clone <your-repo-url>
cd CRYPTO_DASHBOARD_TEST_CHARTIX
```
Install dependencies:
```bash
# npm
npm install

```
## Development Server

Start the development server on http://localhost:3000:

```bash
# npm
npm run dev
```
## Production

Build the application for production:
```bash
# npm
npm run build
```
## Preview production build locally:
```bash
# npm
npm run preview
```
## Project Structure

```bash
CRYPTO_DASHBOARD_TEST_CHARTIX/
│
├─ components/
│   ├─ cards/
│   │   └─ coin-cards.vue
│   ├─ charts/
│   │   └─ sparkline.vue
│   ├─ footers/
│   │   └─ footer.vue
│   ├─ headers/
│   │   └─ header.vue
│   ├─ icons/
│   │   ├─ cog-icon.vue
│   │   ├─ home-icon.vue
│   │   ├─ plus-circle-icon.vue
│   │   ├─ profile-icon.vue
│   │   ├─ shopping-cart-icon.vue
│   │   └─ wallet-icon.vue
│   ├─ navigations/
│   │   └─ navigation.vue
│   ├─ sidebars/
│   │   └─ sidebar.vue
│   ├─ skeletons/
│   │   ├─ coin-card-skeleton.vue
│   │   └─ details-skeleton.vue
│   └─ tables/
│       ├─ crypto-table.vue
│       └─ stat.vue
│
├─ composables/
│   ├─ useFavorites.ts
│   └─ utilities.js
│
├─ layouts/
│   └─ user-panel.vue
│
pages/
 ├─ index.vue
 └─ user/
    ├─ index.vue
    ├─ assets/
    │  └─ [id].vue
    └─ index.vue 
│
├─ assets/
│   └─ (تصاویر و فایل‌های استاتیک)
└─ node_modules/

```
## دموی تصویری دسکتاپ:

<img width="1841" height="887" alt="image" src="https://github.com/user-attachments/assets/f34faf42-ab43-4e28-b3e8-6a834374c0e6" />


<img width="1847" height="866" alt="image" src="https://github.com/user-attachments/assets/8e24af38-95c1-4b22-a534-cc55c5abbaec" />


<img width="1821" height="799" alt="image" src="https://github.com/user-attachments/assets/ad171e3d-12b7-4c5a-a9a0-a638f09022e0" />
<img width="1830" height="805" alt="image" src="https://github.com/user-attachments/assets/11157a23-5313-4a47-be15-980af0b5ef5e" />


## دموی تصویری موبایل:


<img width="393" height="791" alt="image" src="https://github.com/user-attachments/assets/41439b5a-7512-4c3b-8d82-2cf74b2605c4" />

<img width="423" height="790" alt="image" src="https://github.com/user-attachments/assets/a4cde783-966e-41d6-816a-92bf4d1c8853" />


<img width="440" height="802" alt="image" src="https://github.com/user-attachments/assets/03995527-e653-4299-85bd-962e01141f7f" />

<img width="419" height="774" alt="image" src="https://github.com/user-attachments/assets/1cbba32e-c228-43b1-afaa-6f0fbcc351fd" />

## مشارکت

اگر مایل هستید در پروژه مشارکت کنید:

Fork کنید

شاخه جدید بسازید: git checkout -b feature/your-feature

تغییرات را commit کنید

Pull request ارسال کنید

## لایسنس

MIT License © 2025




