import { db } from "../../../firebase";
import { addDoc, getDocs, collection, query, deleteDoc, doc, Firestore, QuerySnapshot, DocumentData, Query, QueryDocumentSnapshot } from "firebase/firestore";
import { CountryDetailsType } from "../../rdx/countryDetailsSlice";


export const removeFromFirestoreHandler = async (country: CountryDetailsType, profileId: string): Promise<void> => {
    const countriesQuery: Query<DocumentData> = query(collection(db as Firestore, "users", profileId, "countries"));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(countriesQuery);
    querySnapshot.forEach((item) =>
      item.data().cca2 === country.cca2
        ? deleteDoc(doc(db, "users", profileId, "countries", item.id))
        : null
    );
  };

  export const addToFavoritesHandler = async (country: CountryDetailsType, profileId: string): Promise<void> => {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db as Firestore, "users", profileId, "countries")));
      const isCountryAdded: QueryDocumentSnapshot<DocumentData> | undefined =  querySnapshot.docs.find((item) => item.data().cca2 === country.cca2)
      if(!isCountryAdded){
        await addDoc(collection(db, "users", profileId, "countries"), country);
      }
    } catch (error) {
      console.log(`Firebase error: ${(error as Error).message}`);
    }
  };