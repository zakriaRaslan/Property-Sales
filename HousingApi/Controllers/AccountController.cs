using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HousingApi.Controllers;
public class AccountController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;
    public AccountController(IUnitOfWork unitOfWork, IConfiguration configuration)
    {
        _unitOfWork = unitOfWork;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> UserLogin(LoginReqDto user)
    {
        var DbUser = await _unitOfWork.UserRepository.AuthenticateUserAsync(user.Username, user.Password);

        if (DbUser == null)
        {
            return Unauthorized();
        }

        LoginResDto loginResDto = new LoginResDto();
        loginResDto.Username = DbUser.UserName;
        loginResDto.Token = CreateToken(DbUser);
        return Ok(loginResDto);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(LoginReqDto user)
    {
        if (await _unitOfWork.UserRepository.IsUserAlreadyExist(user.Username))
            return BadRequest("This User Already Exist");

        _unitOfWork.UserRepository.Register(user.Username, user.Password);
        await _unitOfWork.SaveAsync();
        return StatusCode(201);
    }

    private string CreateToken(User user)
    {
        var secretKey = _configuration.GetSection("AppSettings:Key").Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var claims = new Claim[]
        {
            new Claim(ClaimTypes.Name,user.UserName),
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
        };

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(10),
            SigningCredentials = signingCredentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
