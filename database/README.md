# Fabula Ultima Tools - Database Setup

## Supabase Integration Setup

This guide will help you set up the complete Supabase database for your Fabula Ultima Tools application.

### Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

### Step 1: Database Setup

1. **Open your Supabase project dashboard**
2. **Navigate to the SQL Editor**
3. **Run the database setup script:**
   - Copy the entire contents of `setup.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute all commands

This will create:
- ✅ All necessary tables (9 tables total)
- ✅ Row Level Security (RLS) policies
- ✅ Database functions and triggers
- ✅ Performance indexes
- ✅ Admin functions for user management

### Step 2: Environment Variables

1. **Get your Supabase credentials:**
   - Go to Settings → API in your Supabase dashboard
   - Copy your Project URL and anon public key

2. **Create environment file:**
   - In your webapp/frontend directory, create a `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Demo Mode (set to 'false' for production)
VITE_DEMO_MODE=false
```

### Step 3: Create Initial Admin User

1. **Sign up through your app** to create your first user account
2. **Get your user ID:**
   - Go to Supabase Dashboard → Authentication → Users
   - Find your user and copy the User UID

3. **Promote yourself to admin:**
   - Go back to SQL Editor in Supabase
   - Run this command (replace `your-user-id` with your actual UID):

```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = 'your-user-id-here';
```

### Step 4: Test Your Setup

1. **Start your development server:**
   ```bash
   cd webapp/frontend
   npm run dev
   ```

2. **Test features:**
   - ✅ User registration/login
   - ✅ Character creation and saving
   - ✅ Admin dashboard access (with your admin account)
   - ✅ Combat sessions and dice roll logging

### Available Database Tables

| Table | Purpose |
|-------|---------|
| `user_profiles` | User accounts and roles |
| `characters` | Player character data |
| `campaigns` | Game campaigns |
| `campaign_members` | Campaign participation |
| `inventory` | Character equipment |
| `combat_sessions` | Battle tracking |
| `dice_rolls` | Roll history and statistics |
| `adventures` | Generated adventures |
| `admin_logs` | Administrative actions |

### Admin Dashboard Features

Once you have admin access, you can:
- 👥 **User Management:** Promote users to admin/moderator
- 🎭 **Character Overview:** View and manage all characters
- 🏰 **Campaign Monitoring:** Track active campaigns
- 🎲 **Dice Roll Analytics:** View rolling statistics
- 📝 **Activity Logs:** Monitor admin actions

### Security Features

- **Row Level Security (RLS):** Users can only access their own data
- **Admin-only functions:** Sensitive operations require admin privileges
- **Audit logging:** All admin actions are tracked
- **Secure authentication:** Handled by Supabase Auth

### Troubleshooting

**Problem:** Environment variables not loading
- **Solution:** Restart your development server after creating `.env`

**Problem:** Database connection errors
- **Solution:** Verify your Supabase URL and key are correct

**Problem:** Admin dashboard shows "Access Denied"
- **Solution:** Ensure you've promoted your user to admin role

**Problem:** Demo mode won't disable
- **Solution:** Check that both environment variables are properly set

### Production Deployment

For Netlify deployment:

1. **Set environment variables in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

2. **Configure Supabase for production:**
   - Add your Netlify domain to Site URL in Supabase Auth settings
   - Update any CORS settings if needed

### Database Backup

Supabase automatically backs up your database, but you can also:
1. Go to Settings → Database
2. Use the backup options or export features

---

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Ensure all environment variables are correctly set
4. Check that the database setup script ran without errors

The admin dashboard includes a demo mode for testing - all features work without a database connection for development purposes.