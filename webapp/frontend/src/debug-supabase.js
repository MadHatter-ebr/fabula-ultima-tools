// Debug Supabase connection on Netlify
import { supabase } from './lib/supabase'

async function debugSupabaseOnNetlify() {
  console.log('🔍 Debugging Supabase connection...')
  
  // Check environment variables
  console.log('📊 Environment Variables:')
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'NOT SET')
  console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
  console.log('VITE_DEMO_MODE:', import.meta.env.VITE_DEMO_MODE || 'NOT SET')
  
  // Check supabase client configuration
  console.log('🔧 Supabase Client Config:')
  console.log('Client URL:', supabase.supabaseUrl)
  console.log('Client Key exists:', !!supabase.supabaseKey)
  console.log('Client Key prefix:', supabase.supabaseKey?.substring(0, 20) + '...')
  
  // Test basic connection
  try {
    console.log('🌐 Testing basic connection...')
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Auth session error:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        statusCode: error.statusCode
      })
    } else {
      console.log('✅ Auth session check successful')
    }
  } catch (err) {
    console.error('🚨 Connection test failed:', err)
  }
  
  // Test sign up specifically
  try {
    console.log('📝 Testing sign up API call...')
    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'testpassword123'
    })
    
    if (error) {
      console.error('❌ Sign up test error:', error)
      console.error('Full error object:', JSON.stringify(error, null, 2))
      
      if (error.message?.includes('API key')) {
        console.log('🔑 API Key Issue Detected!')
        console.log('Possible causes:')
        console.log('1. Wrong API key format')
        console.log('2. Expired API key')
        console.log('3. Wrong Supabase project URL')
        console.log('4. API key not for this project')
      }
    } else {
      console.log('✅ Sign up test successful (would create user)')
      console.log('Note: This was just a test call')
    }
  } catch (err) {
    console.error('🚨 Sign up test failed:', err)
  }
}

// Run debug on page load
debugSupabaseOnNetlify()

export default debugSupabaseOnNetlify