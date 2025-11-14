export async function doLogout() {
  try {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const res = await fetch('/logout', {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': token, 'Accept': 'application/json' },
      credentials: 'same-origin',
    });
    if (res.ok || res.status === 204 || res.status === 302) {
      window.location.href = '/login';
      return;
    }
    const text = await res.text();
    console.error('Logout fallo:', res.status, text.slice(0,120));
    alert('No se pudo cerrar sesión');
  } catch (e) {
    console.error(e);
    alert('Error de red en logout');
  }
}
