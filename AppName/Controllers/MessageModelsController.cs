using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppName.Models;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageModelsController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public MessageModelsController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/MessageModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageModel>>> GetMessageModel()
        {
            return await _context.MessageModel.ToListAsync();
        }

        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<MessageModel>>> GetMessageModelByUsername(string _user)
        {
            var messages = from m in _context.MessageModel select m;
            messages = messages.Where(m => m.UserTo == _user).OrderByDescending(m => m.Date);

            return await messages.ToListAsync();
        }

        // GET: api/MessageModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MessageModel>> GetMessageModel(int id)
        {
            var messageModel = await _context.MessageModel.FindAsync(id);

            if (messageModel == null)
            {
                return NotFound();
            }

            return messageModel;
        }

        // POST: api/MessageModels
        [HttpPost]
        public async Task<ActionResult<MessageModel>> PostMessageModel(MessageModel messageModel)
        {
            messageModel.Date = DateTime.Now;
            _context.MessageModel.Add(messageModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessageModel", new { id = messageModel.Id }, messageModel);
        }

        private bool MessageModelExists(int id)
        {
            return _context.MessageModel.Any(e => e.Id == id);
        }
    }
}
