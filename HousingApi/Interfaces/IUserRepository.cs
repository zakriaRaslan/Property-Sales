namespace HousingApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AuthenticateUserAsync(string username, string password);
        void Register(string username, string password);
        Task<bool> IsUserAlreadyExist(string username);
    }
}
