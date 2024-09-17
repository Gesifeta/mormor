export function userLogin(email, password) {
  const query = `*[_user == user && email =='${email}' && password=='${password}']`;
  return query;
}
export const findUserById = (queryParam) => {
  let userQueryString = `*[_type == user && _id == '${queryParam}']`;
  return userQueryString;
};
export const searchPin = (queryParams) => {
  let pinQueryString = `*[_type == "pin" && about match '${queryParams}*' || category match '${queryParams}*'] {
    _id,
    about,
    category,
    image{
    asset->{
    url,
    },
    },
    comment,
    postedBy->{
    _id,
    firstName,
    lastName,
    image{
    asset->{
    url,
    },
    },
    address->{
    street,
    city,
    },
    }
  }`;
  return pinQueryString;
};
export const showAllPins = () => {
  return `*[_type == "pin"][0...30]{
    _id,
    category,
    destination,
    postedBy->{
      _id,
      firstName,
      lastName,
      image{
        asset->{
          url
        }
      }
    },
    address->{
      street,
      city,
    },
    comments,
    image,
  }`;
};

export const showPinById = (queryParam) => {
  let queryString = `*[_type == "pin" && _id == "${queryParam}"] | order(_updatedAt desc)  {
    _id,
    about,
    category,
    destination,
    postedBy,
    userId,
    image,
    likes,
    comments[]{
      _id,
      comment,
      postedBy->{
        firstName,
        lastName,
        image{
          asset->{
            url,
          },
          
        },
        address->{
          city,
        },
       
      }, 
      _createdAt,
    }
  }`;
  return queryString;
};
