const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const name = document.getElementById('userName');
const birth = document.getElementById('birth');
const bio = document.getElementById('bio');
const inputs = [name, birth, bio];
let editing = false;

editBtn.onclick = () => {
    editing = true;
    inputs.forEach(i => i.disabled = false);
    saveBtn.style.display = 'block';
    editBtn.style.display = 'none';
};

saveBtn.onclick = () => {
    editing = false;
    inputs.forEach(i => i.disabled = true);
    saveBtn.style.display = 'none';
    editBtn.style.display = 'block';
};

const toggleOptions = document.querySelectorAll('.toggle-option');

toggleOptions.forEach(opt => {
    opt.onclick = () => {
        if (!editing) return;
        toggleOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
    };
});