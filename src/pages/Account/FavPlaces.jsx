import React, {useEffect} from 'react';
import styled from 'styled-components';

import testFav from '@assets/testFav.png';

import redHeart from '@assets/redHeart.png';

import {useSelector, useDispatch} from 'react-redux';
import { fetchListFavoriteVenues, removeFavoriteVenue } from '../../redux/actions/User';
import { NavLink } from 'react-router-dom';

const FavPlaces = (props) => {
  const dispatch = useDispatch();

  let token = useSelector(({User}) => User.token);
  let lang = useSelector(({User}) => User.lang);
  let favoriteVenues = useSelector(({User}) => User.favoriteVenues)

  useEffect(() => {
    if (token) {
      dispatch(fetchListFavoriteVenues());
    }
  }, [token])

  const handleRemoveFav = (favorite_guid, venue_guid) => {
    dispatch(removeFavoriteVenue(favorite_guid, venue_guid));
  }

  return (
    <Wrapper>
      <TopHeader>
        Любимые места
      </TopHeader>
      <Container>
        {favoriteVenues.map(venue => {
          return (
              <VenuesWrapper>
                <VenueLove onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveFav(venue.guid, venue.venue_guid)
                }}/>
                <VenueImage src={venue.venue_image_url}/>
                <NavLink to={`/restaurant/${venue.venue_guid}`}>
                  <VenueTitle>
                    {venue.venue_name[lang]}
                  </VenueTitle>
                </NavLink>
                <VenueSubTitle>
                  {venue.venue_address[lang]}
                </VenueSubTitle>
              </VenuesWrapper>
          )
        })}
      </Container>
      {/* <div style={{display: 'flex', justifyContent: "center", marginTop: 50}}>
        <Button>
          Показать ещё
        </Button>
      </div> */}
    </Wrapper>
  )
}

export {FavPlaces};


const Button = styled.div`
  width: 300px;
  padding: 13px 0;
  background: ${props => props.theme.primary};
  transition: .2s all;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const Wrapper = styled.div`
`;

const VenuesWrapper = styled.div`
  /* box-shadow: 0 0 15px #cdcdcd; */
  /* box-shadow: 0 0 15px #cdcdcd; */
  border-radius: 5px;
  /* cursor: pointer; */
  position: relative;

  ::before {
    content: '';
  }
`;

const VenueLove = styled.div`
  position: absolute;
  top: 13px;
  cursor: pointer;
  right: 13px;
  background-image: url('${redHeart}');
  background-repeat: no-repeat;
  background-position: center;
  width: 22px;
  height: 22px;
`;

const VenueImage = styled.img`
  width: 100%;
`;

const VenueTitle = styled.div`
  margin-top: 12px;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #404040;
  padding-left: 15px;
  transition: .2s all;
  @media(max-width: 500px) {
    font-size: 11.6667px;
  line-height: 14px;
  }
  :hover {
    transition: .2s all;
    color: ${props => props.theme.primary};
  }
`;

const VenueSubTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #969595;
  margin-top: 6px;
  padding: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  @media(max-width: 500px) {
    font-size: 9.33333px;
    line-height: 11px;
  }
`;
const TopHeader = styled.div`
  height: 60px;
  font-weight: bold;
  font-size: 42px;
  line-height: 51px;
  color: #282828;
  display: flex;
  align-items: center;
  @media(max-width: 700px) {
    font-size: 18px;
    line-height: 22px;
    height: auto;
    margin-left: 10px;

  }
`;

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  /* box-shadow: 0 0 15px #cdcdcd; */
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 25px;
  row-gap: 50px;
  row-gap: 25px;
  @media(max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media(max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
  }
`;