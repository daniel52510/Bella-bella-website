import { initializeApp } from "firebase/app";
import FileInput from '../components/FileInput';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL, deleteObject,  } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid'
import Select from "react-select";


const EmployeePropSettings = () => {

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

      //Firebase Properties Database Access Below...
      const db = getFirestore();
      const colRef = collection(db, 'properties');
      const emailDB = collection(db, 'mail');

      //Firebase Storage (For Photos) Below...
      const storage = getStorage(app)

    //Functionality - We want to be able to upload properties with details - Delete properties - clear email cache???
    const [ homeAddress,setHomeAddress ] = useState('');
    const [ numBed,setNumBed ] = useState('');
    const [ numBath,setNumBath ] = useState('');
    const [ description,setDescription ] = useState('');
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const[ option, setOptions ] = useState([]); 
    const [ selectedOption, setSelectedOption ] = useState(null);

    useEffect(() => {
        async function fetchListings() {
            const listingSnapShot = await getDocs(colRef);
            const listingOptions = listingSnapShot.docs.map((doc) => {
                const data = doc.data();
                return { value: doc.id, label: data.propertyData.address };
            })
            await setOptions(listingOptions);
        }
        fetchListings();
    }, [colRef])
    const handleFileSelect = (files) => {
        setSelectedFiles(files);
    }
    const handleUpload = async () => {
        const photoURLs = [];
        const propertyData = {
            address: homeAddress,
            bedrooms: numBed,
            bathrooms: numBath,
            description: description,
            photos: [],
        };

        const uploadPromises = selectedFiles.map(async (file) => {
            const imageRef = ref(storage, `property-images/${file.name + v4()}`);
            try {
                await uploadBytes(imageRef, file);
                const downloadURL = await getDownloadURL(imageRef);
                photoURLs.push(downloadURL);
                console.log('photoURL array: ', photoURLs);
            } catch (error) {
                console.error("Error Uploading File: ", error);
            }
        });
    
        try {
            await Promise.all(uploadPromises);
            propertyData.photos = photoURLs;
            console.log('propertyData array: ', propertyData.photos);
            await addDoc(colRef, { propertyData });
            alert("Your Property Has Been Uploaded!");
        } catch (error) {
            console.error("Error Adding Property Data: ", error);
        }
        setHomeAddress('');
        setNumBath('');
        setNumBed('');
        setDescription('');
        setSelectedFiles([]);
    };
    const handleDelete = async () => {
        try {
            if (selectedOption && selectedOption.value) {
                const propertyId = selectedOption.value;
                const propertyRef = doc(colRef, propertyId);
                console.log("Property ID:", propertyId);
    
                const propertyDataSS = await getDoc(propertyRef);
    
                if (propertyDataSS.exists()) {
                    const propertyData = propertyDataSS.data().propertyData;
                    console.log("Property Data:", propertyData);
    
                    if (propertyData && Array.isArray(propertyData.photos)) {
                        const photoDeletePromises = propertyData.photos.map(async (photoURL) => {
                            try {
                                // Extract the filename from the URL without the 'property-images/' prefix
                                const filename = photoURL;
                                console.log('filename: ', filename);
                                const photoRef = ref(storage, filename);
                                await deleteObject(photoRef);
                                console.log("Deleted photo:", photoURL);
                            } catch (error) {
                                console.error("Error deleting photo: ", error);
                            }
                        });
    
                        await Promise.all(photoDeletePromises);
    
                        // Delete the property document from Firestore
                        await deleteDoc(propertyRef);
                        setSelectedOption(null); // Clear the selected option
                        alert("Property deleted successfully.");
                    } else {
                        console.log("The property does not have a valid 'photos' field.");
                    }
                } else {
                    console.log("Document does not exist");
                }
            } else {
                console.log('No selected value');
            }
        } catch (error) {
            alert('Error Deleting Property')
            console.error("Error deleting property: ", error);
        }
    };
    const handleEmailDelete = async () => {
        try {
        const snapshot = await getDocs(emailDB);
        if (snapshot.empty) {
            alert('There is no email data to delete...');
        }
        else {
            snapshot.forEach((doc) => {
                console.log('Email Found for Deletion: ', doc.id);
                deleteDoc(doc.ref);
                alert('All Emails have been deleted')
            })
        }
        } catch (error) {
            console.error("Error Deleting emails: ", error);
        }
    }
    return(
        <>
        <h1 className="setting-header">This is the Property Settings Page For Employees Only!</h1>
        <div className="settings-container">
        <div className="listing-upload">
        <h3>Upload Images Here!</h3>
        <FileInput onFileSelect={ handleFileSelect } />
        <input type='text' className="home-address" placeholder="Home Address" value={ homeAddress }onChange={(e) => setHomeAddress(e.target.value)} />
        <input type='text' className="num-bed" placeholder="Number of Bedrooms" value={ numBed } onChange={(e) => setNumBed(e.target.value)} />
        <input type='text' className="num-bath" placeholder="Number of Bathrooms" value={ numBath } onChange={(e) => setNumBath(e.target.value)}/>
        <textarea name='description' className="home-description" rows='6' value={ description } placeholder="Home Description" onChange={(e) => setDescription(e.target.value)}/>
        <button className='property-button' onClick={ handleUpload }>Submit</button>
        </div>
        <div className="listing-delete">
        <h3>Delete Listings Below!</h3>
        <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={option}
        getOptionLabel={(option) => option.label} // Specify how to display the label (address)
        getOptionValue={(option) => option.value} // Specify the value
        />
        <button className='delete-property-button' onClick={ handleDelete }>Delete</button>
        </div>
        </div>
        <div className="delete-emails">
        <h3>Click Button Below to Delete Email Data to Save on Space! ~Suggested Every 30 Days~ </h3>
        <button className="button-home" onClick={ handleEmailDelete }>Delete Emails</button>
        </div>
        </>
    );
}
export default EmployeePropSettings;