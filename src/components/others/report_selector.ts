import { ReportView } from '../../constants';

export function createReportSelector(renderReportCallback: (reportView: ReportView) => void) {
  const mainDiv = document.getElementsByClassName('l-main__inner')[0] as HTMLElement | undefined;
  if (!mainDiv) {
    return;
  }

  const selectorDiv = document.createElement('div');
  selectorDiv.className = 'form-group training-set-toggle report';

  const selectDiv = document.createElement('div');
  selectDiv.className = 'col-sm-12 float-right';

  const label = document.createElement('label');
  label.innerHTML = 'Wybież raport:  ';

  const select = document.createElement('select');
  select.className = 'panel';
  Object.values(ReportView).forEach((attribute) => {
    const option = document.createElement('option');
    option.value = attribute.toString();
    option.text = attribute.toString();
    select.appendChild(option);
  });

  select.onchange = (event) => {
    const target = event.target as HTMLSelectElement;
    renderReportCallback(target.value as ReportView);
  };

  selectDiv.appendChild(label);
  selectDiv.appendChild(select);
  selectorDiv.appendChild(selectDiv);
  mainDiv.appendChild(selectorDiv);
}
