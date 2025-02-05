﻿// <auto-generated />
using System;
using EcoCarpet.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EcoCarpet.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250203130658_CreateSubscriptionTables")]
    partial class CreateSubscriptionTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EcoCarpet.Server.Models.Carpet", b =>
                {
                    b.Property<int>("CarpetID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CarpetID"));

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("AvailableStock")
                        .HasMaxLength(100)
                        .HasColumnType("int");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Descriptions")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Dimensions")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Material")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("CarpetID");

                    b.ToTable("Carpets");
                });

            modelBuilder.Entity("EcoCarpet.Server.Models.Subscription", b =>
                {
                    b.Property<int>("SubscriptionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SubscriptionID"));

                    b.Property<decimal>("AnnualFee")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CarpetLimit")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SubscriptionID");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("EcoCarpet.Server.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.Property<string>("Postalcode")
                        .IsRequired()
                        .HasMaxLength(4)
                        .HasColumnType("nvarchar(4)");

                    b.HasKey("UserID")
                        .HasName("PK_Users");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("EcoCarpet.Server.Models.UserSubscription", b =>
                {
                    b.Property<int>("UserSubscriptionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserSubscriptionID"));

                    b.Property<int>("CurrentCarpets")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("RenewalDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SubscriptionID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("UserSubscriptionID");

                    b.HasIndex("SubscriptionID");

                    b.ToTable("UserSubscriptions");
                });

            modelBuilder.Entity("EcoCarpet.Server.Models.UserSubscription", b =>
                {
                    b.HasOne("EcoCarpet.Server.Models.Subscription", "Subscription")
                        .WithMany()
                        .HasForeignKey("SubscriptionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Subscription");
                });
#pragma warning restore 612, 618
        }
    }
}
