import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import PropertyTile from '../components/PropertyTile';
const ListingPage = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAcdpax1Bk5XySYKC4xQ-6u05TnKkoMvEc",
        authDomain: "bella-bella-realty-website.firebaseapp.com",
        projectId: "bella-bella-realty-website",
        storageBucket: "bella-bella-realty-website.appspot.com",
        messagingSenderId: "256708251300",
        appId: "1:256708251300:web:b92120f36e9233b43ce031",
        measurementId: "G-6CSM0W2QH9"
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const colRef = collection(db,'properties');
      const [listings, setListings] = useState([]);
      useEffect(() => {
        async function fetchListings() {
            try {
            const listingSnapShot = await getDocs(colRef);
            const listingData = [];
            if(!listingSnapShot.empty){
                listingSnapShot.forEach((doc) => {
                    const data = doc.data();
                    listingData.push(data);
                });
                setListings(listingData);
            } else {
                console.log('properties collection is empty');
            }
        } catch(error) {
            console.error('Error fetching listings: ', error);
        }
        }
        fetchListings();
    }, [])

    return(
        <>
        <h1 className="listing-title">Our Current Listings</h1>
        <div className="listing-container">
        {listings.map((property) => (
          <PropertyTile key={property.id} property={property} />
        ))}
        </div>
        </>
    );
}
export default ListingPage;