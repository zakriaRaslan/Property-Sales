using AutoMapper;
using HousingApi.Dtos;
using HousingApi.Models;

namespace HousingApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
        }
    }
}
