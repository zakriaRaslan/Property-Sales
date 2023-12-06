namespace HousingApi.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        void SetCity(City city);
        void DeleteCity(int cityId);
        void UpdateCity(City city);
        Task<City> FindCityAsync(int cityId);
    }
}
