import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

import testpicture from '../../assets/thumb-up-fill.png'

import './Profile.css'

function Profile () {
    const { user } = useContext(AuthContext);

    const [loading, toggleLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [updateProfilePicture, setUpdateProfilePicture] = useState([]);
    const [editProfilePicture, toggleEditProfilePicture] = useState(false);

    const [imgDate, setImgDate] = useState(Date.now());

    const profilePicture = profile?.imageUrl ? `https://novi-backend-api-wgsgz.ondigitalocean.app${profile.imageUrl}?t=${imgDate}` : testpicture;

    useEffect (()=> {
        const token = localStorage.getItem('token');
        toggleLoading(true);

        async function fetchUserProfile() {
            try {
                const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userProfile/${user.id}`,{
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                });
                setProfile(response.data);
                toggleLoading(false);
            } catch (e){
                console.error(e);
            }
        }
        fetchUserProfile();
    },[])

    async function UpdateProfilePicture () {
        try {
            const formData = new FormData();
            formData.append("imageUrl", updateProfilePicture[0]);

            console.log(formData);

            const update = await axios.patch(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userProfile/${user.id}`,
                formData
            , {
                headers: {
                    'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                    'accept': '*/*',
                }
            })
            setProfile(update.data);
            setImgDate(Date.now());
            console.log('here is the updated profile:', update.data)
        } catch (e) {
            console.error(e);
        }
    }

    function formSubmit(e) {
        e.preventDefault();
        console.log("form submit");
        console.log(e);

        console.log(updateProfilePicture[0]);
        console.log("image size");
        console.log(updateProfilePicture[0].size);

        /* Img file needs to be smaller dan 2MB */
        if (updateProfilePicture[0].size < 2097152) {
            console.log("file is kleiner dan 2.097.152 bytes")
            UpdateProfilePicture ();
            toggleEditProfilePicture(false);
        }
    }

    return (
        <>
            {
                profile &&
                <>
                    <div className="profile-content-wrapper">
                        <header className="profile-header">
                            <h1 className="profile-header">Welcome {profile.username}</h1>
                            <h2 className="profile-header">Your profile</h2>
                        </header>
                        <section className='profile-main'>
                            <div className='profile-picture-wrapper'>
                                <img className='profile-picture' src={profilePicture} alt={profile?.picture?.fileName}/>
                                {editProfilePicture === true ?
                                    <section >
                                        <form className='profile-form' onSubmit={formSubmit}>
                                            Select a new profile picture
                                            <input
                                                type="file"
                                                accept=".jpeg, .png, .webp, .svg, .xml"
                                                name="profile-picture"
                                                id="update-profile-picture"
                                                onChange={((e)=> setUpdateProfilePicture(e.target.files))}
                                            />
                                            <button type="submit" className='profile-button'>Submit</button>
                                        </form>
                                    </section>
                                    : ''
                                }
                                {editProfilePicture === true ?
                                    <button className='profile-button-cancel' onClick={(()=>toggleEditProfilePicture(false))} >Cancel</button>
                                    :
                                    <button className='profile-button' onClick={(()=>toggleEditProfilePicture(true))} >Edit profile picture</button>
                                }
                            </div>
                            <p>Username: {profile.username}</p>
                            <p>You have been a member since {profile.registered}</p>
                        </section>
                    </div>
                </>
            }
            {loading === true && <p>Loading...</p>}
        </>
    )
}

export default Profile