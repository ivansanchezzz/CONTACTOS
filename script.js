const contacts = [];

// Muestra el formulario basado en la acción seleccionada
function showForm(action) {
  const formContainer = document.getElementById('form-container');
  const form = document.getElementById('contact-form');
  formContainer.style.display = 'block';
  form.dataset.action = action;

  const nameField = document.getElementById('name');
  nameField.style.display = action === 'search' || action === 'delete' ? 'none' : 'block';
}

// Oculta el formulario
function exitApp() {
  alert('Gracias por usar la agenda de contactos.');
  window.location.reload();
}

// Procesa la acción seleccionada
function submitForm() {
  const form = document.getElementById('contact-form');
  const action = form.dataset.action;
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!validatePhone(phone)) return;

  switch (action) {
    case 'search':
      searchContact(phone);
      break;
    case 'add':
      if (!name) {
        alert('El nombre es obligatorio para añadir un contacto.');
        return;
      }
      addContact({ name, phone });
      break;
    case 'update':
      if (!name) {
        alert('El nombre es obligatorio para actualizar un contacto.');
        return;
      }
      updateContact({ name, phone });
      break;
    case 'delete':
      deleteContact(phone);
      break;
    default:
      alert('Acción no válida.');
  }
  resetForm();
}

// Valida el formato del teléfono
function validatePhone(phone) {
  if (!phone || phone.length !== 11 || isNaN(phone)) {
    alert('El número de teléfono debe tener 11 dígitos numéricos.');
    return false;
  }
  return true;
}

// Busca un contacto
function searchContact(phone) {
  const contact = contacts.find(c => c.phone === phone);
  const output = contact
    ? `Contacto encontrado:\nNombre: ${contact.name}\nTeléfono: ${contact.phone}`
    : 'No se encontró ningún contacto con ese número.';
  displayOutput(output);
}

// Añade un nuevo contacto
function addContact(contact) {
  if (contacts.find(c => c.phone === contact.phone)) {
    alert('Ya existe un contacto con ese número.');
    return;
  }
  contacts.push(contact);
  displayOutput(`Contacto añadido:\nNombre: ${contact.name}\nTeléfono: ${contact.phone}`);
}

// Actualiza un contacto existente
function updateContact(contact) {
  const index = contacts.findIndex(c => c.phone === contact.phone);
  if (index === -1) {
    alert('No se encontró ningún contacto con ese número.');
    return;
  }
  contacts[index].name = contact.name;
  displayOutput(`Contacto actualizado:\nNombre: ${contact.name}\nTeléfono: ${contact.phone}`);
}

// Elimina un contacto
function deleteContact(phone) {
  const index = contacts.findIndex(c => c.phone === phone);
  if (index === -1) {
    alert('No se encontró ningún contacto con ese número.');
    return;
  }
  const removed = contacts.splice(index, 1);
  displayOutput(`Contacto eliminado:\nNombre: ${removed[0].name}\nTeléfono: ${removed[0].phone}`);
}

// Muestra mensajes en la sección de salida
function displayOutput(message) {
  document.getElementById('output').textContent = message;
}

// Resetea el formulario
function resetForm() {
  document.getElementById('form-container').style.display = 'none';
  document.getElementById('contact-form').reset();
}
