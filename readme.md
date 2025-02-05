# Insurance Policy Manager

A web-based insurance policy management system built with React and Supabase. This application allows users to manage vehicle insurance policies with features for creating, reading, updating, and deleting policies.

## Features

- 🔐 User Authentication
  - Sign up with email/password
  - Sign in with existing account
  - Secure sign out

- 📋 Policy Management
  - Create new insurance policies
  - View list of existing policies
  - Edit policy details
  - Delete policies
  - Automatic policy number generation

- 💰 Premium Calculation
  - Automatic premium calculation based on vehicle price and rate
  - Currency formatting in Indonesian Rupiah (IDR)

- 🎨 Modern UI/UX
  - Responsive design with Tailwind CSS
  - Clean and intuitive interface
  - Toast notifications for user feedback
  - Loading states and error handling

## Tech Stack

- **Frontend Framework**: React 18
- **UI Framework**: Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite
- **Additional Libraries**:
  - date-fns: Date formatting
  - react-toastify: Toast notifications
  - @heroicons/react: UI icons

## Project Structure
```
insurance-policy-manager/ 
├── src/ 
│ ├── components/ 
│ │ ├── Auth.jsx                    # Authentication component 
│ │ ├── PolicyForm.jsx              # Form for creating/editing policies 
│ │ └── PolicyList.jsx              # Table display of policies 
│ ├── lib/ │ │ └── supabase.js      # Supabase client configuration 
│ ├── utils/ │ │ └── currency.js    # Currency formatting utilities 
│ ├── App.jsx                       # Main application component 
│ ├── index.css                     # Global styles 
│ └── main.jsx                      # Application entry point 
├── supabase/ 
│ └── migrations/                   # Database schema and policies 
├── .env                            # Environment variables 
├── index.html                      # HTML entry point 
├── package.json                    # Project dependencies 
├── postcss.config.js               # PostCSS configuration 
└── tailwind.config.js              # Tailwind CSS configuration
```

## Database Schema

The application uses a `policies` table with the following structure:

- `id`: UUID (Primary Key)
- `policy_number`: Text (Unique)
- `insured_name`: Text
- `policy_effective_date`: Date
- `policy_expiration_date`: Date
- `vehicle_brand`: Text
- `vehicle_type`: Text
- `vehicle_year`: Integer
- `vehicle_price`: Numeric
- `premium_rate`: Numeric
- `premium_price`: Numeric
- `created_at`: Timestamp with timezone
- `updated_at`: Timestamp with timezone
- `user_id`: UUID (Foreign Key to auth.users)

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a .env file with your Supabase credentials:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4. Run the development server:
```bash
npm run dev
```
5. Build for production:
```bash
npm run build
```

## Security Features

- Row Level Security (RLS) enabled on the policies table
- Users can only access their own policies
- Secure authentication flow
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
