import countries from 'world-countries'

const formattedCountryList = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}))

export const useCountryList = () => {
  const getAll = () => formattedCountryList

  const getByValue = (value: string) => {
    return formattedCountryList.find((item) => item.value === value)
  }

  return {
    getAll,
    getByValue
  }
}
