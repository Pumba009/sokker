import { playerAttributes } from '../../constants';

export function createPlayerAtrributeSelector(
  populateChartCallback: (skillId: string, labelName: string) => void,
) {
  const mainDiv = document.getElementsByClassName('l-main__inner')[0] as HTMLElement | undefined;
  if (!mainDiv) {
    return;
  }
  const selectorDiv = document.createElement('div');
  selectorDiv.className = 'form-group training-set-toggle player-attribute';

  const selectDiv = document.createElement('div');
  selectDiv.className = 'col-sm-7';

  const label = document.createElement('label');
  label.innerHTML = 'Wybież umiejętność: ';

  const select = document.createElement('select');
  select.className = 'panel';
  select.onchange = (event) => {
    const target = event.target as HTMLSelectElement;
    populateChartCallback(target.options[target.selectedIndex].text, target.value);
  };

  playerAttributes.forEach((attribute) => {
    const option = document.createElement('option');
    option.value = attribute.value.toString();
    option.text = attribute.key;
    select.appendChild(option);
  });

  selectDiv.appendChild(label);
  selectDiv.appendChild(select);
  selectorDiv.appendChild(selectDiv);
  mainDiv.appendChild(selectorDiv);
}

export function deleteReportSelector() {
  const el = document.querySelector('.form-group.training-set-toggle.player-attribute');
  el?.remove();
}
