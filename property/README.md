# Property Manager

A comprehensive property management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Property Management**: Track and manage multiple properties
- **Tenant Management**: Maintain tenant information and lease agreements
- **Financial Tracking**: Monitor income, expenses, and cash flow
- **Document Management**: Store and organize property-related documents
- **Reporting**: Generate financial and occupancy reports
- **User Authentication**: Secure login and role-based access control

## Tech Stack

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: Auth0
- **Database**: Prisma ORM with PostgreSQL
- **File Storage**: AWS S3
- **Payments**: Stripe
- **Caching**: Redis
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL database
- AWS account (for S3)
- Auth0 account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd property-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
property-manager/
├── app/                 # Next.js 13+ app directory
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard and main application pages
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/              # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── properties/      # Property-related components
│   ├── tenants/         # Tenant-related components
│   ├── finances/        # Financial components
│   ├── charts/          # Chart components
│   ├── layout/          # Layout components
│   └── providers/       # Context providers
├── lib/                 # Utility functions and libraries
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
├── config/              # Configuration files
├── public/              # Static assets
└── prisma/              # Prisma schema and migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

The application is designed to be deployed on Vercel, which provides seamless integration with Next.js. Make sure to configure all environment variables in your Vercel project settings.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.