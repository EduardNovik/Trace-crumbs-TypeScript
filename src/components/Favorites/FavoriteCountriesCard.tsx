import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FcFullTrash } from "react-icons/fc"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import NoCoatOfArms from '../../assets/NoCoatOfArms.png'

import { db } from '../../../firebase'
import { getDocs, collection, query, deleteDoc, doc, onSnapshot, Query, DocumentData, QuerySnapshot, Firestore } from 'firebase/firestore';

import { useDispatch, useSelector } from "react-redux";
import { CountryDetailsType, updateCountryDetailsState } from "../../rdx/countryDetailsSlice";
import { updateCountryCheckedState } from '../../rdx/countryCheckedSlice'

import { FC, ReactElement } from "react";
import { AppDispatch, RootState } from "../../rdx/store";
import { CheckedDataType } from '../../rdx/countryCheckedSlice'

type LinkStyleType = {
  '&:hover':{cursor:string}, 
  textDecoration: string, 
  color: string
}

const FavoriteCountriesCard: FC = (): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();
  const [favoriteCountries, setFavoriteCountries] = useState<CountryDetailsType|null>(null);
  const profileId = useSelector<RootState, string|null>(state => state.signIn.profileId)
  const countriesCheckedDataState = useSelector<RootState, CheckedDataType>((state) => state.countryChecked.data)


  const countryDetailsHandler = (country:CountryDetailsType):void => {
    dispatch(updateCountryDetailsState(country));
  };


  const fetchFirebaseData = async (): Promise<void> => {
    const countriesQuery: Query<DocumentData> = query(collection(db as Firestore, 'users', profileId as string, 'countries'))
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(countriesQuery)
    const firebaseCountries: DocumentData[] = querySnapshot.docs.map((item) => item.data()) 
    setFavoriteCountries(firebaseCountries)
  }

  useEffect(() => {
    if (profileId) {
      fetchFirebaseData();
    }else{
      setFavoriteCountries(null)
    }
  }, [profileId]);


  const deleteFromFavoritesHandler = (country: CountryDetailsType, profileId: string, e: any):void => {
    const q: Query<DocumentData> = query(collection(db, 'users', profileId, 'countries'))
    onSnapshot(q, (querySnapshot) => {
      const countriesArr: CountryDetailsType[] = [];
      querySnapshot.forEach((item) => {
        item.data().cca2 === country.cca2 ? deleteDoc(doc(db, "users", profileId, 'countries', item.id)) : null
        countriesArr.push({...item.data()})
      }) 
      setFavoriteCountries(countriesArr);
    })
    dispatch(updateCountryCheckedState({...countriesCheckedDataState, [country.cca2]:e.target.checked}))
  }

  return (
    <>
      {favoriteCountries && profileId ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Your countires list</TableCell>
                <TableCell align="left">Country name</TableCell>
                <TableCell align="left">Capital</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteCountries.map((country: CountryDetailsType) => (
                  <TableRow
                    key={country.name.common}
                    sx={{
                      transition: 'all 0.20s',  
                      "&:last-child td, &:last-child th": { border: 0 },
                      '&:hover':{boxShadow: "0px 0px 20px 0px dimgray"} 
                    }}
                    onClick={()=>countryDetailsHandler(country)}
                  >
                    <TableCell component="th" scope="row">
                      <img 
                        src={country.coatOfArms.png ? country.coatOfArms.png : NoCoatOfArms} 
                        alt="Coat Of Arms" 
                        style={{ maxHeight:'70px'}}
                      />
                    </TableCell>
                    <TableCell align="left"><Link to={"/country"} style={{'&:hover':{cursor:'pointer'}, textDecoration:'none', color:'inherit'} as LinkStyleType}>{country.name.common}</Link></TableCell>
                    <TableCell align="left">{country.capital[0]}</TableCell>
                    <TableCell align="left" sx={{'&:hover':{cursor:'pointer'}}} onClick={(e) => deleteFromFavoritesHandler(country, profileId, e)}><FcFullTrash style={{fontSize:'25px'}}/></TableCell>
                  </TableRow>
              ))}
            </TableBody> 
          </Table>
        </TableContainer>
      ) : (
        <Stack direction="row" sx={{justifyContent:'center', mt:'100px'}}>
          <Typography variant="h5">Please, sign in first to see your Favorites</Typography>
        </Stack>
      )}
    </>
  );
};

export default FavoriteCountriesCard;
