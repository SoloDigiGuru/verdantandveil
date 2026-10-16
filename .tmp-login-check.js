const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const raw = fs.readFileSync('.env.local', 'utf8');
const map = {};
for (const line of raw.split(/\r?\n/)) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) map[match[1]] = match[2];
}

process.env.NEXT_PUBLIC_SUPABASE_URL = map['NEXT_PUBLIC_SUPABASE_URL'];
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = map['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'elimihelesolomonehichioya@gmail.com',
    password: 'Ehis456@@@XXX'
  });

  console.log(JSON.stringify({
    ok: !error,
    userId: data && data.user ? data.user.id : null,
    error: error ? error.message : null
  }));
})().catch((e) => {
  console.log(JSON.stringify({ ok: false, error: e.message }));
});
