document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button');
  button.textContent = 'Click me!';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    const status = document.createElement('div');
    status.textContent = 'Button clicked!';
    document.body.appendChild(status);
  });
});
