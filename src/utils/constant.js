export const LOGO = "https://cdn.cdnlogo.com/logos/n/82/netflix.png";
export const UserAvatar = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"; 

export const API_OPTIONS = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`
        }
}