﻿using AutoMapper;
using DotNet6WebApi.Data;
using DotNet6WebApi.DTO;
using DotNet6WebAPI.DTO;

namespace DotNet6WebApi.Helper
{
    public class AutoMapperSetting : Profile
    {
        public AutoMapperSetting()
        {
            //Genre
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<Genre, SmallerGenreDTO>().ReverseMap();
            //User
            CreateMap<AppUser, UserRegisterDTO>().ReverseMap();
            CreateMap<AppUser, LoginUserDTO>().ReverseMap();
            CreateMap<AppUser, SimpleUserDTO>().ReverseMap();
            //Publisher
            CreateMap<Publisher, PublisherDTO>().ReverseMap();
            CreateMap<Publisher, DetailPublisherDTO>().ReverseMap();
            //Author
            CreateMap<Author, AuthorDTO>().ReverseMap();
            CreateMap<Author, DetailAuthorDTO>().ReverseMap();
            //Book
            CreateMap<Book, BookDTO>().ReverseMap();
            CreateMap<Book, SimpleBookInfoDTO>().ReverseMap();
            //PromotionInfo
            CreateMap<PromotionInfo, PromotionInfoDTO>().ReverseMap();
            //Promotion
            CreateMap<Promotion,PromotionDTO>().ReverseMap();
            //Review
            CreateMap<Review, ReviewDTO>().ReverseMap();
            //Order
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Order,CreateOrderDTO>().ReverseMap();
            //Order Details
            CreateMap<OrderDetail, OrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetail, CreateOrderDetailDTO>().ReverseMap();
        }
    }
}
