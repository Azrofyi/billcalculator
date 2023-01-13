export default function () {
  const billInput = document.getElementById('amount');
  const tipInputs = document.querySelectorAll('input[name="tip"]');
  const customTipInput = document.querySelector('input[name="customtip"]');
  const peopleInput = document.getElementById('people');
  const tipViewer = document.querySelector('.viewer.tip');
  const totalViewer = document.querySelector('.viewer.total');
  const errorDiv = document.querySelector('.ppl-error');
  const reset = document.querySelector('input[name="reset"]');

  errorDiv.style.display = 'none';

  billInput.addEventListener('input', function (event) {
    let billValue = event.target.value;

    billValue = billValue.replace(/[^0-9.]/g, '');

    let output = billValue.split('.');
    output = output.shift() + (output.length ? '.' + output.join('') : '');

    event.target.value = output;
    updateValues();
  });

  customTipInput.addEventListener('input', function (event) {
    let tipValue = event.target.value;

    tipValue = tipValue.replace(/[^0-9]/g, '');
    if (tipValue > 1000) {
      tipValue = 1000;
    }
    event.target.value = tipValue;

    if (tipValue) {
      tipInputs.forEach(function (input) {
        input.checked = false;
      });
    }
    updateValues();
  });

  tipInputs.forEach(function (input) {
    // Adding event listener to all radio inputs
    input.addEventListener('click', function () {
      customTipInput.value = '';
      updateValues();
    });
  });

  peopleInput.addEventListener('input', function (event) {
    let pplValue = event.target.value;

    pplValue = pplValue.replace(/[^0-9]/g, '');
    event.target.value = pplValue;

    if (+pplValue === 0) {
      errorDiv.style.display = 'block';
      peopleInput.style.borderColor = 'rgb(210, 120, 100)';
    } else {
      errorDiv.style.display = 'none';
      peopleInput.style.borderColor = '';
      updateValues();
    }
  });

  function updateValues() {
    let billValue = parseFloat(billInput.value) || 0;
    let tipValue = 0;
    let peopleValue = parseFloat(peopleInput.value) || 1;

    // Get selected tip value
    tipInputs.forEach(function (input) {
      if (input.checked) {
        tipValue = parseFloat(input.value);
      }
    });

    // Use custom tip value if provided
    if (!tipValue) {
      tipValue = parseFloat(customTipInput.value) || 0;
    }

    let tip = (billValue * tipValue) / 100 / peopleValue;
    let total = billValue / peopleValue + tip;
    tipViewer.innerHTML = '$' + tip.toFixed(2);
    totalViewer.innerHTML = '$' + total.toFixed(2);
  }

  reset.addEventListener('click', function () {
    tipViewer.innerHTML = '$0.00';
    totalViewer.innerHTML = '$0.00';
  });
}
