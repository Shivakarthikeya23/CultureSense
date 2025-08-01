# Supabase Setup Guide for CultureSense

This guide will help you set up Supabase authentication and database for CultureSense.

## 1. Supabase Project Setup

### Create a New Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `culturesense`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users
5. Click "Create new project"

### Get Your Project Credentials
1. Go to Settings → API
2. Copy the following:
   - **Project URL**: `https://xavsprnmcrfxapryyxxz.supabase.co`
   - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: (for backend operations)

## 2. Database Schema Setup

### Run the SQL Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the schema

### Verify Tables Created
You should see these tables in the Table Editor:
- `users` - User profiles
- `cultural_personas` - Saved cultural personas
- `cultural_analyses` - Saved analysis results
- `user_sessions` - User session tracking

## 3. Authentication Setup

### Configure Email Auth
1. Go to Authentication → Settings
2. Under "Site URL", add your development URL: `http://localhost:3000`
3. Under "Redirect URLs", add:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/profile`

### Email Templates (Optional)
1. Go to Authentication → Email Templates
2. Customize the confirmation and reset email templates
3. Add your branding and messaging

## 4. Environment Variables

### Frontend (.env.local)
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xavsprnmcrfxapryyxxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdnNwcm5tY3JmeGFwcnl5eHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTM2NjgsImV4cCI6MjA2OTU2OTY2OH0.RSs5DRVHuchovEeUVgkMp2HXW3iYxSj_0IbCU0FBzfs
```

### Backend (.env)
Add to your existing `backend/.env` file:

```env
SUPABASE_URL=https://xavsprnmcrfxapryyxxz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdnNwcm5tY3JmeGFwcnl5eHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTM2NjgsImV4cCI6MjA2OTU2OTY2OH0.RSs5DRVHuchovEeUVgkMp2HXW3iYxSj_0IbCU0FBzfs
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 5. Install Dependencies

### Frontend
```bash
cd frontend
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
```

### Backend
```bash
cd backend
npm install @supabase/supabase-js
```

## 6. Testing the Setup

### Test Authentication
1. Start your frontend: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Get Started" to sign up
4. Check your email for confirmation
5. Sign in and verify you can access protected routes

### Test Database Operations
1. Create a cultural persona
2. Check the `cultural_personas` table in Supabase
3. Verify the data is saved correctly

## 7. Production Deployment

### Update Environment Variables
For production, update the environment variables with your production URLs:

```env
# Frontend
NEXT_PUBLIC_SUPABASE_URL=https://xavsprnmcrfxapryyxxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Backend
SUPABASE_URL=https://xavsprnmcrfxapryyxxz.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Update Supabase Settings
1. Go to Authentication → Settings
2. Update Site URL to your production domain
3. Add production redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com/dashboard`
   - `https://yourdomain.com/profile`

## 8. Security Considerations

### Row Level Security (RLS)
The schema includes RLS policies that ensure:
- Users can only access their own data
- Public personas can be viewed by anyone
- Proper authentication is required for protected operations

### API Keys
- **Anon Key**: Safe for frontend use (has RLS restrictions)
- **Service Role Key**: Keep secret, only use in backend
- Never commit API keys to version control

## 9. Troubleshooting

### Common Issues

**"Invalid API key" error**
- Verify your API keys are correct
- Check that you're using the right key for frontend vs backend

**"Row Level Security policy violation"**
- Ensure RLS is enabled on tables
- Check that policies are correctly configured
- Verify user authentication is working

**"Email confirmation not working"**
- Check email templates in Supabase
- Verify redirect URLs are correct
- Check spam folder for confirmation emails

### Debug Mode
Enable debug logging in your Supabase client:

```javascript
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
})
```

## 10. Next Steps

After setup, you can:
1. Customize the authentication flow
2. Add social login providers
3. Implement user roles and permissions
4. Set up real-time subscriptions
5. Configure backup and monitoring

## Support

If you encounter issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the [Supabase Discord](https://discord.supabase.com)
3. Check the project issues for known problems 