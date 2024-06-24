import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import PageMenu from '../../Components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/card/Card';
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../Components/loader/Loader';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { shortenText } from '../../utils';


const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`


const Profile = () => {
    const dispatch = useDispatch();
    const {isLoading, user} = useSelector((state) => state.auth)
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        address: {
            address: user?.address.address ||"",
            state: user?.address.state ||"",
            country: user?.address.country ||"",
        },
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
    }
    const [profile,setProfile] = useState(initialState);
    const [profileImage,setProfileImage] = useState(null);
    const [imagePreview,setImagePreview] = useState(null);

    useEffect(() => {
        if(user===null){
            dispatch(getUser());
        }
    },[dispatch, user])

    useEffect(() => {
        if(user) {
            setProfile({
                name: user?.name || "",
                email: user?.email || "",
                address: {
                    address: user?.address.address ||"",
                    state: user?.address.state ||"",
                    country: user?.address.country ||""
                },
                phone: user?.phone || "",
                role: user?.role || "",
                photo: user?.photo || "",
            })
        }
    },[dispatch, user])

    const saveProfile = async(e) => {
        e.preventDefault();
        const userData = {
            name: profile.name,
            phone: profile.phone,
            address: {
                address: profile.address,
                state: profile.state,
                country: profile.country,
            },    
        }
        // console.log(userData);
        await dispatch(updateUser(userData));
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    }

    const savePhoto = async(e) => {
        e.preventDefault();
        let imageURL;
        try {
            if(profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")){
                const image = new FormData();
                image.append("file", profileImage)
                image.append("cloud_name", cloud_name)
                image.append("upload_preset", upload_preset)

                //Save image to cloudinary
                const response = await fetch(url, {method: "post", body: image})
                const imageData = await response.json();
                // console.log(imageData);
                imageURL = imageData.url.toString();
            }
        }catch(error) {
            toast.error(error.message)
        }

        // save image to mongodb
        const userData = {
            photo: profileImage ? imageURL : profile.photo
        }
        await dispatch(updatePhoto(userData));
        setImagePreview(null);
    }

  return (
    <>
        <section>
            {isLoading && <Loader></Loader>}
            <div className='container'>
                <PageMenu></PageMenu>
                <h2>Profile</h2>
                <div className={`--flex-start ${styles.profile}`}>
                    <Card cardClass={styles.card}>
                        {!isLoading && user && (
                            <>
                                <div className={styles["profile-photo"]}>
                                    <div className='--center-all'>
                                        <img src={imagePreview === null ? user?.photo : imagePreview} alt='profile'></img>
                                        <h3>Role: {profile.role}</h3>
                                        {imagePreview !==null && (
                                            <button className='--btn --btn-secondary' onClick={savePhoto}><AiOutlineCloudUpload size={18}></AiOutlineCloudUpload> Uplaod Photo</button>
                                        )}
                                    </div>
                                </div>
                                <form onSubmit={saveProfile}>
                                    <p>
                                        <label>Change photo</label>
                                        {/* in accept we have given image/* which means all types of image */}
                                        <input type='file' accept='image/*' name='image' onChange={handleImageChange}></input>
                                    </p>
                                    <p>
                                        <label>Name</label>
                                        <input type='text' value={profile?.name} name='name' onChange={handleInputChange} required></input>
                                    </p>
                                    <p>
                                        <label>Email</label>
                                        <input type='email' value={profile?.email} name='email' onChange={handleInputChange} disabled required></input>
                                    </p>
                                    <p>
                                        <label>Phone No.</label>
                                        <input type='text' value={profile?.phone} name='phone' onChange={handleInputChange}  required></input>
                                    </p>
                                    <p>
                                        <label>address</label>
                                        <input type='text' value={profile?.address?.address} name='address' onChange={handleInputChange}></input>
                                    </p>
                                    <p>
                                        <label>State</label>
                                        <input type='text' value={profile?.address?.state} name='state' onChange={handleInputChange}></input>
                                    </p>
                                    <p>
                                        <label>Country</label>
                                        <input type='text' value={profile?.address?.country} name='country' onChange={handleInputChange}></input>
                                    </p>
                                    <button className='--btn --btn-primary --btn-block'>
                                        Update Profile
                                    </button>
                                </form>
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    </>
  )
}

export const UserName = () => {
    const {user} = useSelector((state) => state.auth);
    const username = user ?.name || "...";
    return(
        <span style={{color: "#ff7722"}}>Hi, {shortenText(username,9)} |</span>
    )
}

export default Profile