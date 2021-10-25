import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import {SortDirection, SORT_DIRECTION, AssetClassEnum} from '../../constants';

type Instrument = {
    ticker: string;
    price: number;
    assetClass: string;
}

const Instruments = () => {
    const [instrumentData, setInstrumentData] = useState<Instrument[]>([]);

    useEffect(() => {
        fetch('SampleData.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then( response => response.json())
        .then(response => setInstrumentData(response));
    }, []);

    const sortByAssetClass = (a: Instrument, b: Instrument, direction: SortDirection) => { 
        if (AssetClassEnum[a.assetClass as keyof typeof AssetClassEnum] < AssetClassEnum[b.assetClass as keyof typeof AssetClassEnum]) {
        return direction === SORT_DIRECTION.ASC ? -1 : 1;
        }
        if (AssetClassEnum[a.assetClass as keyof typeof AssetClassEnum] > AssetClassEnum[b.assetClass as keyof typeof AssetClassEnum]) {
        return direction === SORT_DIRECTION.ASC ? 1 : -1;
        }
        return 0;
    }

    const columnConfig = [
        {
            id: 'ticker',
            name: 'Ticker',
            restrictSort: true,
        },
        {
            id: 'price',
            name: 'Price',
            restrictSort: true,
            defaultSortDirection: SORT_DIRECTION.DESC as SortDirection,
            customStyleRenderer: (value: number) => ({color: value < 0 ? '#FF0000' : '#0B5DD9'}),
        },
        {
            id: 'assetClass',
            name: 'Asset Class',
            restrictSort: true,
            customSortFn: sortByAssetClass,
        }
    ]

    const tableConfig = {
        enableSort: true,
        customRowStyleRenderer: (row: Instrument) => {
            const style: {[key: string]: string} = {}
            if(AssetClassEnum[row.assetClass as keyof typeof AssetClassEnum] === AssetClassEnum.Credit) {
                style['background-color'] = '#DDFFDD';
            }
            if(AssetClassEnum[row.assetClass as keyof typeof AssetClassEnum] === AssetClassEnum.Equities) {
                style['background-color'] = '#B1D9EB';
            }
            return style;
        },
    }

    return (
        <Table tableConfig={tableConfig} columnConfig={columnConfig} data={instrumentData} />
    );
}

export default Instruments;