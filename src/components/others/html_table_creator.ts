export class Table {
    public static createTable(): HTMLTableElement {
        const layoutMainDiv = document.createElement('div');
        const mtpDiv = document.createElement('div');
        const trainingDiv = document.createElement('div');
        const tableDiv = document.createElement('div');
        const tableRoot = document.createElement('table');

        layoutMainDiv.className = 'layout__main';
        mtpDiv.className = 'mtp-tab__table';
        trainingDiv.className = 'training-table';
        tableDiv.className = 'is-sticky';
        tableRoot.className = 'table__root';

        tableDiv.appendChild(tableRoot);
        trainingDiv.appendChild(tableDiv);
        mtpDiv.appendChild(trainingDiv);
        layoutMainDiv.appendChild(trainingDiv);

        const divOnPage = document.getElementsByClassName('l-main__inner')[0];
        divOnPage.appendChild(layoutMainDiv);

        return tableRoot;
    }

    public static addTableHeader(
        tableRoot: HTMLTableElement,
        trainingReportTableHeaders: { key: string; value: string }[],
    ) {
        //thead
        const thead: HTMLTableSectionElement = tableRoot.createTHead();
        const rowThead: HTMLTableRowElement = thead.insertRow();
        rowThead.appendChild(this.addHead({ key: 'data', value: 'data' }));
        trainingReportTableHeaders.forEach((name) => {
            rowThead.appendChild(this.addHead(name));
        });
    }

    private static addHead(attribute: { key: string; value: string }): HTMLTableCellElement {
        const th: HTMLTableCellElement = document.createElement('th');
        th.className = `table__th table__th--${attribute.key} is-sortable`;

        const wrapedDiv = document.createElement('div');
        wrapedDiv.className = 'table__th-wrap';
        wrapedDiv.style.display = 'flex';
        wrapedDiv.style.marginLeft = 'auto';

        const dataDiv = document.createElement('div');
        dataDiv.setAttribute('data-tip', 'true');
        dataDiv.setAttribute('data-for', 'tooltip-10');
        dataDiv.setAttribute('currentitem', 'false');

        const dataParagraph = document.createElement('p');
        dataParagraph.className = 'tooltip-cell';
        dataParagraph.textContent = attribute.value;

        dataDiv.appendChild(dataParagraph);
        wrapedDiv.appendChild(dataDiv);
        th.appendChild(wrapedDiv);
        return th;
    }

    public static addCellToRow(row: HTMLTableRowElement, cellName: string, value: string): HTMLTableCellElement {
        const cell: HTMLTableCellElement = row.insertCell();
        cell.className = `table__cell table__cell--${cellName}`;
        const wrapedDiv = document.createElement('div');
        wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
        const span = document.createElement('span');
        const wrapedSpan = document.createElement('span');
        wrapedSpan.className = 'growth-bg';
        wrapedSpan.textContent = value;

        span.appendChild(wrapedSpan);
        wrapedDiv.appendChild(span);
        cell.appendChild(wrapedDiv);
        return cell;
    }

    public static addCellToRowWithColor(
        row: HTMLTableRowElement,
        cellName: string,
        value: string,
        colorCellName: string,
    ) {
        const cell = this.addCellToRow(row, cellName, value);

        const wrapedDiv = cell.lastElementChild;
        const wrapedSpan = wrapedDiv?.lastElementChild;
        if (wrapedSpan) {
            wrapedSpan.className = colorCellName;
        }
    }
}
