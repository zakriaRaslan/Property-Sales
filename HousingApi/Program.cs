using HousingApi.Data;
using HousingApi.Interfaces;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(x =>
x.UseSqlServer(builder.Configuration.GetConnectionString("default")));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
