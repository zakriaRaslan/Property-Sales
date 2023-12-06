namespace HousingApi.Interfaces
{
    public interface IUnitOfWork
    {
        public ICityRepository CityRepository { get; }
        public IUserRepository UserRepository { get; }
        Task<bool> SaveAsync();
    }
}
