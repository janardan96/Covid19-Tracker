import React, { useState, useEffect } from 'react'
import { Box, Table, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: "10px",
        overflowY: 'scroll',
        height: '400px',
    },
    background: {
        backgroundColor: "#efefef"
    }
}));

function TableCom({ countries }) {
    const classes = useStyles();
    const [sortedData, setSortedData] = useState([])

    function merge(arr1, arr2) {
        var result = [];
        var i = 0;
        var j = 0;
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i].cases < arr2[j].cases) {
                result.push(arr2[j]);
                j++;
            }
            else {
                result.push(arr1[i]);
                i++;
            }
        }

        while (i < arr1.length) {
            result.push(arr1[i]);
            i++
        }
        while (j < arr2.length) {
            result.push(arr2[j])
            j++
        }
        return result;
    }

    function mergeSort(arr) {
        if (arr.length <= 1) return arr;
        var midPoint = Math.floor(arr.length / 2);
        var left = mergeSort(arr.slice(0, midPoint));
        var right = mergeSort(arr.slice(midPoint));
        return merge(left, right);
    }

    useEffect(() => {
        let sortedArray = mergeSort(countries)
        setSortedData(sortedArray);
    }, [countries])



    return (
        <Box className={classes.table} mb={3}>
            <TableContainer >
                <Table size="small">
                    <TableBody>
                        {sortedData.map(({ country, cases }, i) => (
                            // <tr>
                            //     <td>{country}</td>
                            //     <td>
                            //         <strong>{cases}</strong>
                            //     </td>
                            // </tr>
                            <TableRow key={i} className={clsx((i % 2 === 0) && classes.background)}>
                                <TableCell component="th" scope="row">
                                    {country}
                                </TableCell>
                                <TableCell align="center"> {new Intl.NumberFormat('en-IN').format(cases)}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TableCom
