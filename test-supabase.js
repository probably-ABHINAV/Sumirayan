const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local
let envConfig = {};
try {
  const envPath = path.join(process.cwd(), '.env.local');
  console.log('Reading env from:', envPath);
  
  if (!fs.existsSync(envPath)) {
    console.error('File not found:', envPath);
    process.exit(1);
  }

  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      // Join back the rest in case value contains =
      let value = parts.slice(1).join('=').trim();
      // Remove quotes
      value = value.replace(/^['"]|['"]$/g, '');
      envConfig[key] = value;
    }
  });
} catch (e) {
  console.error('Error reading .env.local:', e);
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  console.log('Found keys:', Object.keys(envConfig));
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  console.log('Testing Supabase connection...');
  console.log('URL:', supabaseUrl);
  
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase Error:', JSON.stringify(error, null, 2));
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      console.error('Code:', error.code);
    } else {
      console.log('Success! Data fetched:', data);
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
  }
}

testFetch();
