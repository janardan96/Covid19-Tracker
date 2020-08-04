import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    text: {
        fontWeight: '600',
        fontSize: '1.5rem',
    },
    cases: {
        color: '#cc1034'
    },
    recovered: {
        color: '#a1e24f'
    },
    deaths: {
        color: '#f5aaa7'
    },
    pointer: {
        cursor: "pointer"
    }
});



function InfoBox({ title, cases, id, active, total, ...props }) {
    const classes = useStyles();


    return (
        <Card onClick={props.onClick} >
            <CardContent>
                <Typography variant='subtitle1' color='textSecondary' >{title}</Typography>

                <Typography variant='body1' className={clsx(classes.text, title === 'Coronavirus Cases' && classes.cases, title === 'Recovered' && classes.recovered, title === 'Deaths' && classes.deaths)}>
                    {new Intl.NumberFormat('en-IN').format(cases)}</Typography>

                {/* {active ? <Typography variant='subtitle1' color='textSecondary'>
                    {`Active ${new Intl.NumberFormat('en-IN').format(active)}`}</Typography> : ""} */}

                <Typography variant='subtitle1' color='textSecondary'>
                    {`Total ${new Intl.NumberFormat('en-IN').format(total)}`}</Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
