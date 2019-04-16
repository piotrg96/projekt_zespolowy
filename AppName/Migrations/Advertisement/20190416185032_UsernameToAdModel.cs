using Microsoft.EntityFrameworkCore.Migrations;

namespace AppName.Migrations.Advertisement
{
    public partial class UsernameToAdModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "Advertisment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "username",
                table: "Advertisment");
        }
    }
}
