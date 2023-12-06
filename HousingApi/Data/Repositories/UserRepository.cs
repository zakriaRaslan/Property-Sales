using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HousingApi.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> AuthenticateUserAsync(string username, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null || user.PasswordKey == null)
                return null;

            if (!PasswordisCorrect(password, user.PasswordKey, user.Password))
                return null;

            return user;
        }

        public void Register(string username, string password)
        {
            byte[] PasswordHash, PasswordKey;
            using (var Hmac = new HMACSHA256())
            {
                PasswordKey = Hmac.Key;
                PasswordHash = Hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            var User = new User();
            User.UserName = username;
            User.Password = PasswordHash;
            User.PasswordKey = PasswordKey;
            _dbContext.Users.Add(User);

        }

        public async Task<bool> IsUserAlreadyExist(string username)
        {
            return await _dbContext.Users.AnyAsync(x => x.UserName == username);
        }

        private bool PasswordisCorrect(string passwordText, byte[] passwordKey, byte[] password)
        {
            using var Hmac = new HMACSHA256(passwordKey);
            var passwordHash = Hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

            for (var i = 0; i < passwordHash.Length; i++)
            {
                if (password[i] != passwordHash[i])
                {
                    return false;
                }
            }
            return true;


        }

    }
}
