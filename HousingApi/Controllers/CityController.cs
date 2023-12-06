using Microsoft.AspNetCore.Authorization;

namespace HousingApi.Controllers;

[Authorize]
public class CityController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public CityController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }


    [HttpGet]
    public async Task<IActionResult> GetCitiesAsync()
    {
        var cities = await _unitOfWork.CityRepository.GetCitiesAsync();
        var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);
        return Ok(citiesDto);
    }

    [HttpPost]
    public async Task<IActionResult> AddCity([FromBody] CityDto cityDto)
    {
        var city = _mapper.Map<City>(cityDto);
        city.LastUpdatedBy = 1;
        city.LastUpdatedIn = DateTime.Now;
        _unitOfWork.CityRepository.SetCity(city);
        await _unitOfWork.SaveAsync();
        return StatusCode(201);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateCity([FromBody] CityDto cityDto, int id)
    {
        if (id != cityDto.Id)
            return BadRequest("SomeThimg Went Wrong We Can Not Find This City");
        var dbCity = await _unitOfWork.CityRepository.FindCityAsync(id);
        if (dbCity == null)
        {
            return BadRequest("SomeThimg Went Wrong We Can Not Find This City");
        }
        dbCity.LastUpdatedBy = 1;
        dbCity.LastUpdatedIn = DateTime.Now;
        _mapper.Map(cityDto, dbCity);
        await _unitOfWork.SaveAsync();
        return StatusCode(200);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteCity(int cityId)
    {
        _unitOfWork.CityRepository.DeleteCity(cityId);
        await _unitOfWork.SaveAsync();
        return Ok(cityId);
    }



}