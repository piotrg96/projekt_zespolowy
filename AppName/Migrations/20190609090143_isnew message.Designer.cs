﻿// <auto-generated />
using System;
using AppName.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AppName.Migrations
{
    [DbContext(typeof(AdvertisementContext))]
    [Migration("20190609090143_isnew message")]
    partial class isnewmessage
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AppName.Models.Advertisement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<string>("CategoryName");

                    b.Property<int?>("CityId");

                    b.Property<string>("CityName");

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Description");

                    b.Property<string>("PhoneNumber");

                    b.Property<float>("Price");

                    b.Property<int?>("ProvinceId");

                    b.Property<string>("ProvinceName");

                    b.Property<string>("Title");

                    b.Property<string>("Username");

                    b.Property<float>("Yardage");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CityId");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Advertisment");
                });

            modelBuilder.Entity("AppName.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("AppName.Models.City", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("CityName");

                    b.Property<int>("ProvinceId");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("AppName.Models.FavoriteAd", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdvertisementId");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("FavoriteAds");
                });

            modelBuilder.Entity("AppName.Models.Image", b =>
                {
                    b.Property<string>("Path")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdvertisementId");

                    b.HasKey("Path");

                    b.HasIndex("AdvertisementId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("AppName.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<DateTime>("Date");

                    b.Property<bool>("IsNew");

                    b.Property<string>("Topic");

                    b.Property<string>("UserFrom");

                    b.Property<string>("UserTo");

                    b.HasKey("Id");

                    b.ToTable("MessageModel");
                });

            modelBuilder.Entity("AppName.Models.Province", b =>
                {
                    b.Property<int>("Id");

                    b.Property<string>("ProvinceName");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("AppName.Models.Advertisement", b =>
                {
                    b.HasOne("AppName.Models.Category", "Category")
                        .WithMany("Advertisements")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AppName.Models.City", "City")
                        .WithMany("Advertisements")
                        .HasForeignKey("CityId");

                    b.HasOne("AppName.Models.Province", "Province")
                        .WithMany("Advertisements")
                        .HasForeignKey("ProvinceId");
                });

            modelBuilder.Entity("AppName.Models.City", b =>
                {
                    b.HasOne("AppName.Models.Province", "Province")
                        .WithMany("Cities")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AppName.Models.Image", b =>
                {
                    b.HasOne("AppName.Models.Advertisement")
                        .WithMany("AdvertisementImages")
                        .HasForeignKey("AdvertisementId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
