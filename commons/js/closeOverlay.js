export default function closeOverlay(){
    const el = document.getElementById('of-overlay-modal');
    if (el) {
        el.style.display = 'none';
        el.innerHTML = '';
        window.location.reload();
        console.log('aconteci!')
    }
    console.log('aconteci!')
}