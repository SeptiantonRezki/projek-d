import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GetStaticProps } from 'next';
import React from 'react';
import { openDB, Person } from '../../openDB';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
      marginTop: 40,
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 300,
      width: 300,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export default function allPerson({ dataPerson }) {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);


  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPerson.map((data) => (
              <StyledTableRow key={data.idPerson}>
                <StyledTableCell component="th" scope="row">
                  {data.idPerson}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {data.email}
                </StyledTableCell>

                <StyledTableCell align="right">{data.pass}</StyledTableCell>
                <StyledTableCell align="right">{data.roler_person}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <h1>grid 1</h1>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <h1>grid 1</h1>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <h1>grid 1</h1>
        </Grid>
      </Grid>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = new openDB();
  const personDB = new Person(db);

  const dataPerson = await personDB.getAll();

  return { props: { dataPerson } };
}
