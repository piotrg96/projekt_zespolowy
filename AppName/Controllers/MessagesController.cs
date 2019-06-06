﻿using AppName.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public MessagesController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/MessageModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageModel()
        {
            return await _context.MessageModel.ToListAsync();
        }

        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessageModelByUsername(string user)
        {
            var messages = from m in _context.MessageModel select m;
            messages = messages.Where(m => m.UserTo == user).OrderByDescending(m => m.Date);

            return await messages.ToListAsync();
        }

        // GET: api/MessageModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessageModel(int id)
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
        public async Task<ActionResult<Message>> PostMessageModel(Message message)
        {
            message.Date = DateTime.Now;
            _context.MessageModel.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessageModel", new { id = message.Id }, message);
        }

        private bool MessageModelExists(int id)
        {
            return _context.MessageModel.Any(e => e.Id == id);
        }
    }
}