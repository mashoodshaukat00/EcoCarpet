using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoCarpet.Server.Migrations
{
    /// <inheritdoc />
    public partial class addImgName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgName",
                table: "Carpets",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgName",
                table: "Carpets");
        }
    }
}
