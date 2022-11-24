import { useEffect, useState } from 'react'
import './recent.css'
import './../favourite/favourite.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, showModal } from '../../redux/modalSlice'
import { weather } from '../../redux/weatherSlice'

const Recent = () => {
  const [dialog, setDialog] = useState(false)
  const [fetchedData, setFetchedData] = useState<any>([])
  const [search, setSearch] = useState('')
  const [Searced, setSearced] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const weatherData = useSelector((state: any) => state.weatherData)

  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${search}&format=json&u=f`

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '40adfff86amshae63704e562067ap186c63jsnff5b3c3286a4',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
    },
  }
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setFetchedData(json))
      .catch((err) => console.error('error:' + err))
  }, [search])

  const recentSearchData = JSON.parse(localStorage.getItem('search') || '[]')
  const favData = JSON.parse(localStorage.getItem('fav') || '[]')

  useEffect(() => {
    Searced && dispatch(weather(fetchedData))
  }, [fetchedData])

  useEffect(() => {
    Searced && navigate('/')
  }, [weatherData])

  return (
    <div>
      {JSON.stringify(recentSearchData) === '[]' ? (
        <div className="nothing">
          <div className="nothingImg">
            <img
              src={require('../../assets/icon_nothing.png')}
              alt=""
              className="notImage"
            />
          </div>
          <div className="nothingText">No Recent Search</div>
        </div>
      ) : (
        <div>
          <div className="favContainer">
            <div className="favHeadContainer">
              <div className="favleft">
                <div className="backBtn">
                  <img
                    src={require('../../assets/back.png')}
                    alt=""
                    className="backButtonImg"
                    onClick={() => navigate('/')}
                  />
                </div>
                <div className="favoriteHead"> Recent Search</div>
              </div>
              <div className="favright">
                <div className="search">
                  <img
                    src={require('../../assets/searchMobile.png')}
                    alt=""
                    className="searchMobileImg"
                    onClick={() => {
                      dispatch(showModal())
                      navigate('/')
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="favHead">
              <div className="cities">You recently searched for</div>
              <div
                className="removeAll"
                onClick={() => {
                  setDialog(true)
                }}
              >
                Clear All
              </div>
            </div>
            <div className="favColumnReverse">
              {' '}
              {recentSearchData.map((searchData: any, i: any) => {
                let icon = ''
                switch (
                  searchData &&
                  searchData.current_observation &&
                  searchData.current_observation.condition.text
                ) {
                  case 'Haze':
                    icon = 'icon_mostly_sunny_small.png'
                    break
                  case 'Mostly Sunny':
                    icon = 'icon_mostly_sunny_small.png'
                    break
                  case 'Sunny':
                    icon = 'icon_mostly_sunny_small.png'
                    break
                  case 'Clear':
                    icon = 'icon_mostly_sunny_small.png'
                    break

                  case 'Cloudy':
                    icon = 'icon_mostly_cloudy_small.png'
                    break
                  case 'Partly Cloudy':
                    icon = 'icon_partly_cloudy_small.png'
                    break
                  case 'Mostly Cloudy':
                    icon = 'icon_mostly_cloudy_small.png'
                    break

                  case 'Thunderstorm':
                    icon = 'icon_thunderstorm_small.png'
                    break

                  case 'Rainy':
                    icon = 'icon_rain_small.png'
                    break
                  case 'Sleet':
                    icon = 'icon_rain_small.png'
                    break
                  case ' Showers':
                    icon = 'icon_rain_small.png'
                    break
                  default:
                    icon = 'icon_rain_small.png'
                    break
                }
                const favHandler = () => {
                  setSearch(searchData.location.city)
                  setSearced(true)
                }
                const favourites = JSON.parse(
                  localStorage.getItem('fav') || '[]',
                )
                //console.log('woeid', favourites)
                let fav = false
                for (let i = 0; i < favourites.length; i++) {
                  if (
                    (favourites[i] &&
                      favourites[i].location &&
                      favourites[i].location.woeid) ===
                    (searchData &&
                      searchData.location &&
                      searchData.location.woeid)
                  ) {
                    fav = true
                  }
                }

                // console.log('new remId', fav)

                return (
                  <div
                    className="favBodyContainer"
                    key={i}
                    onClick={() => {
                      favHandler()
                    }}
                  >
                    <div className="favBody">
                      <div className="favrouriteMobile">
                        <div className="state">
                          {searchData &&
                            searchData.location &&
                            searchData.location.city}
                          ,{' '}
                          {searchData &&
                            searchData.location &&
                            searchData.location.country}
                        </div>
                        <div className="threeElements">
                          <div className="elementOne">
                            <img
                              src={require(`../../assets/${icon}`)}
                              alt=""
                              className="elementOneImg"
                            />
                          </div>
                          <div className="elementTwo">
                            {searchData &&
                              searchData.current_observation &&
                              searchData.current_observation.condition &&
                              searchData.current_observation.condition
                                .temperature}
                            <span className="deg">&nbsp;&#x2109;</span>
                          </div>
                          <div className="elementThree">
                            {searchData &&
                              searchData.current_observation &&
                              searchData.current_observation.condition &&
                              searchData.current_observation.condition.text}
                          </div>
                        </div>
                      </div>

                      <div className="fillHeart">
                        <img
                          src={
                            fav
                              ? require('../../assets/icon_favourite_Active.png')
                              : require('../../assets/icon_favourite.png')
                          }
                          alt=""
                          className="fillHeartImg"
                        />
                      </div>
                      {/* {favData.map((item: any, index: any) => {
                        return (
                          <div key={index}>
                            {(searchData &&
                              searchData.location &&
                              searchData.location.woeid) ===
                            (item && item.location && item.location.woeid) ? (
                              <div>
                                <img
                                  src={require('../../assets/icon_favourite_Active.png')}
                                  alt=""
                                  className="fillHeartImg"
                                />
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        )
                      })} */}
                    </div>

                    {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      {dialog ? (
        <div>
          <div className="modalContainer">
            <div className="overlay">
              <div className="modalContent">
                <div className="infoModal">
                  Are you sure want to remove all the favourites?
                </div>
                <div className="modalButtons">
                  <form action="" className="modalForm">
                    <button className="btnNo" onClick={() => setDialog(false)}>
                      No
                    </button>
                    <button
                      className="btnNo"
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('search')
                        setDialog(false)
                      }}
                    >
                      Yes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Recent
