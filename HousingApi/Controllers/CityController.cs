using HousingApi.Interfaces;
using HousingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HousingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CityController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet("Cities")]
        public async Task<IActionResult> GetCitiesAsync()
        {
            var cities = await _unitOfWork.CityRepository.GetCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity(City city)
        {
            _unitOfWork.CityRepository.SetCity(city);
            await _unitOfWork.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCity(int cityId)
        {
            _unitOfWork.CityRepository.DeleteCity(cityId);
            await _unitOfWork.SaveAsync();
            return Ok(cityId);
        }

    }
}