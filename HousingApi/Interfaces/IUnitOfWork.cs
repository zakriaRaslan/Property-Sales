namespace HousingApi.Interfaces
{
    public interface IUnitOfWork
    {
        public ICityRepository CityRepository { get; }
        Task<bool> SaveAsync();
    }
}
